"use client"

import { signOut } from "@/features/auth/action"
import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useState } from "react"

const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false)
  const handleClick = async () => {
    setIsPending(true)
    const { error } = await signOut()
    setIsPending(false)
    if (error) {
      notifications.show({
        color: "red",
        message: error.message,
        title: "ログアウトに失敗しました",
      })
    }
  }

  return (
    <Button loading={isPending} onClick={handleClick}>
      <span>ログアウト</span>
    </Button>
  )
}

export default SignOutButton
