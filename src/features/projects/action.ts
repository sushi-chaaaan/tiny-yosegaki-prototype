"use server"

import type { ProjectInsert } from "@/db/schema/projects"

import {
  ALL_OPENED_PROJECTS_CACHE_TAG,
  USER_CREATED_PROJECTS_CACHE_TAG,
  revalidateProjectWithId,
} from "@/cache"
import { db } from "@/db"
import { __deleteProject, insertProject } from "@/features/projects/db"
import { revalidateTag } from "next/cache"

const createNewProject = async (project: ProjectInsert) => {
  const res = await insertProject(project)
  if (res.success) {
    revalidateTag(USER_CREATED_PROJECTS_CACHE_TAG)
    if (project.status === "open") {
      revalidateTag(ALL_OPENED_PROJECTS_CACHE_TAG)
    }
  }
  return res
}

type GetProJectsForCardOptions = {
  limit?: number
  offset?: number
}

const getProjectsForCard = async (
  options?: GetProJectsForCardOptions | undefined,
) => {
  const projects = await db.query.projects.findMany({
    columns: {
      hasThumbnail: true,
      projectDescription: true,
      projectId: true,
      projectName: true,
    },
    limit: options?.limit,
    offset: options?.offset,
    where: (project, { eq }) => {
      return eq(project.status, "open")
    },
    with: {
      author: {
        columns: {
          userId: true,
          userName: true,
        },
      },
      joinedUsers: {
        columns: {
          userId: true,
        },
      },
    },
  })
  return projects
}

const checkProjectIsAvailable = async (projectId: string) => {
  const project = await db.query.projects.findFirst({
    columns: {
      projectName: true,
      status: true,
    },
    where: (project, { eq }) => {
      return eq(project.projectId, projectId)
    },
  })
  if (!project) {
    return {
      data: null,
      exists: false as const,
    }
  }
  return {
    data: project,
    exists: true as const,
  }
}

const checkProjectAuthorIsUser = async ({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) => {
  const project = await db.query.projects.findFirst({
    columns: {
      authorId: true,
    },
    where: (project, { eq }) => {
      return eq(project.projectId, projectId)
    },
  })
  if (!project) {
    return false
  }
  return project.authorId === userId
}

const deleteProject = async (projectId: string) => {
  await __deleteProject(projectId)
  revalidateProjectWithId(projectId)
  revalidateTag(USER_CREATED_PROJECTS_CACHE_TAG)
  revalidateTag(ALL_OPENED_PROJECTS_CACHE_TAG)
}

export {
  checkProjectAuthorIsUser,
  checkProjectIsAvailable,
  createNewProject,
  deleteProject,
  getProjectsForCard,
}
