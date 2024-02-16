"use client"

import { ICON_STROKE_WIDTH } from "@/components/layouts/Header/UserMenu"
import { signOutUser } from "@/features/users/action"
import { useServerAction } from "@/hooks/useServerAction"
import { LoadingOverlay, MenuItem } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"
import { usePathname } from "next/navigation"

const SignOutItem = () => {
  const pathName = usePathname()
  const [runAction, isPending] = useServerAction(signOutUser)

  const handleClick = () => {
    runAction({ revalidatePath: pathName }).finally(() => {
      window.location.reload()
    })
  }

  return (
    <MenuItem
      aria-label="ログアウト"
      leftSection={<IconLogout stroke={ICON_STROKE_WIDTH} />}
      onClick={handleClick}
      role="button"
    >
      <LoadingOverlay visible={isPending} />
      <p>ログアウト</p>
    </MenuItem>
  )
}

export default SignOutItem
