import type { UserUpdate } from "@/db/schema/users"

import { UserUpdateSchema } from "@/db/schema/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type UserProfileFormArgs = {
  user: UserUpdate
}

const useProfileForm = ({ user }: UserProfileFormArgs) => {
  const returnValue = useForm<UserUpdate>({
    defaultValues: user,
    mode: "onTouched",
    resolver: zodResolver(UserUpdateSchema),
  })

  return returnValue
}

export { useProfileForm }