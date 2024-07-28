import { TMovie } from "@/types/movies";

export const MovieCard = ({ movie }: { movie: TMovie }) => {
  return (
    <div className="group relative h-96 w-64 overflow-hidden shadow-lg shadow-zinc-600">
      <img
        className="absolute left-0 top-0 -z-10 size-full object-cover object-top"
        src={movie.poster}
        alt={movie.title}
      />
      <div className="absolute bottom-0 left-0 z-0 h-64 w-full bg-gradient-to-t from-zinc-950 transition-[bottom] duration-300 ease-in-out group-hover:-bottom-64"></div>
      <div className="ease-on-out absolute z-10 grid size-full grid-cols-2 grid-rows-[90%_1fr] place-items-end justify-items-start p-4 text-start text-zinc-50 transition-[opacity] duration-300 group-hover:opacity-0">
        <h2 className="col-span-2 text-2xl font-semibold">{movie.title}</h2>
        <p className="">{movie.year}</p>
        <p>{movie.type}</p>
      </div>
    </div>
  );
};
