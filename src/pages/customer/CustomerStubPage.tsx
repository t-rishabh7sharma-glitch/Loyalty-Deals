export function CustomerStubPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-2">
      <div className="w-full max-w-lg rounded-2xl border border-black/5 bg-white p-8 text-center shadow-card">
        <h1 className="text-xl font-bold text-black md:text-2xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-navy">This area is a placeholder in the prototype. Use Home and Coupons for full flows.</p>
      </div>
    </div>
  );
}
