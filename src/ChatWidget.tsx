"use client"

import React, { useEffect, useState } from "react"
import ConnectyCubeChatWidget from "@connectycube/chat-widget/react19"
import { AdminStore, StoreCustomer } from "@medusajs/types"

export interface ChatWidgetProps {
  productId: string
  productName: string
  store: AdminStore
  customer: StoreCustomer | null
  chatPerProduct?: boolean
}

export default function ChatWidget({
  store,
  customer,
  productId,
  productName,
  chatPerProduct,
}: ChatWidgetProps) {
  const quickActions = {
    title: "Quick Actions",
    description:
      "Select an action from the options below or type a first message to start a conversation.",
    actions: [
      "Hi, I'm interested in this product.",
      "Can you tell me more about the price and payment options?",
      "Is the product still available?",
      "Can I schedule a viewing?",
    ],
  }

  if (!customer) {
    return null
  }

  const [defaultChat, setDefaultChat] = useState<any>(null)
  const [isOpen, setIsOpen] = useState<any>(false)

  const onOpenCloseWidget = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }

  useEffect(() => {
    if (isOpen) {
      console.log("Widget is open:", isOpen)
      const defaultChatKey = chatPerProduct ? productId : store.id
      const defaultChatName = chatPerProduct ? productName : store.name

      setDefaultChat({
        id: defaultChatKey,
        opponentUserId: store.id,
        type: "group",
        name: defaultChatName,
      })
    }
  }, [isOpen])

  return (
    <div>
      <ConnectyCubeChatWidget
        // credentials
        appId={process.env.NEXT_PUBLIC_CHAT_APP_ID}
        authKey={process.env.NEXT_PUBLIC_CHAT_AUTH_KEY}
        userId={customer.id}
        userName={`${customer.first_name} ${customer.last_name}`}
        // settings
        showOnlineUsersTab={false}
        splitView={true}
        // quick actions
        quickActions={quickActions}
        // notifications
        showNotifications={true}
        playSound={true}
        // moderation
        enableContentReporting={true}
        enableBlockList={true}
        // last seen
        enableLastSeen={true}
        // url preview
        enableUrlPreview={true}
        limitUrlsPreviews={1}
        // attachments settings
        attachmentsAccept={"image/*,video/*,.pdf,audio/*"}
        // default chat
        defaultChat={defaultChat}
        onOpenChange={onOpenCloseWidget}
      />
    </div>
  )
}
