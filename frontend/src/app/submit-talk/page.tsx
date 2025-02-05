import NewTalkForm from '@/components/NewTalkForm';

export default function SubmitTalkPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Submit a Talk</h1>
      <NewTalkForm />
    </div>
  );
}
