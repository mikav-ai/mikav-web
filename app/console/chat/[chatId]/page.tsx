export default async function ChatIdPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900">Chat: {chatId}</h2>
    </div>
  );
}
