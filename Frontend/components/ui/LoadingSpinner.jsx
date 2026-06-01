export default function LoadingSpinner() {
  return (
    <section className="h-screen flex justify-center items-center w-full bg-purple-200/90">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-solid"></div>
        <p className="mt-4 text-purple-500 font-semibold text-lg">
          Loading, please wait...
        </p>
      </div>
    </section>
  );
}