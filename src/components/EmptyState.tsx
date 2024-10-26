interface Props {
  title?: string;
  description?: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="border rounded-md w-full py-20 px-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold">{title || 'No data found'}</h1>

      <p className="text-muted-foreground">{description || 'No data found'}</p>
    </div>
  );
}
