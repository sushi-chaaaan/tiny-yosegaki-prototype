import MessageForm from "@/features/messages/components/MessageForm"
import { getUser } from "@/features/supabase/action"
import { Title } from "@mantine/core"
import { redirect } from "next/navigation"

export default async function Page() {
  const {
    data: { user },
  } = await getUser()
  if (user == null) {
    redirect("/")
  }

  return (
    <div>
      <Title order={1}>寄せ書き投稿ページ</Title>
      <MessageForm user={user} />
    </div>
  )
}
