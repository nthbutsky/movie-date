import { Header } from "@/components/Header";
import { MovieList } from "@/components/MovieList";

export default function Home() {
  const headerTitle = "Movie Date";

  return (
    <main className="animate-slide-on flex h-dvh flex-col items-center px-4">
      <Header title={headerTitle} />
      <MovieList />
    </main>
  );
}
