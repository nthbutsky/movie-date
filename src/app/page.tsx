import { Header } from "@/components/Header";
import { MovieList } from "@/components/MovieList";

export default function Home() {
  return (
    <main className="p-4">
      <Header />
      <MovieList />
    </main>
  );
}
