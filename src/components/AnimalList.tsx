import { useFetchCat, useFetchDog } from "src/api/animalApi";
import { useEffect } from "react";
import { LazyLoader } from "./common/LazyLoader";

// const useFetchAnimals = () => {
//     const { dog, initFetchDog } = useFetchDog();
//     const { cat, initFetchCat } = useFetchCat();
//     const fetchAnimals = () => {
//         initFetchDog();
//         initFetchCat();
//     };
//     useEffect(() => {
//         fetchAnimals();
//     }, []);
//     return {
//         dog,
//         cat,
//         fetchAnimals,
//     };
// };

export function AnimalList() {
    const { dog, initFetchDog, isFetchDogStatusError, isFetchDogStatusPending, isFetchDogStatusSuccess, isFetchDogStatusIdle } = useFetchDog()
    return (
        <div className="my-8 mx-auto max-w-2xl">
            <div className="flex justify-center gap-8">
                <div className="w-64 h-64">
                    {isFetchDogStatusIdle ? <p>Welcome</p> : null}
                    <LazyLoader show={isFetchDogStatusPending} delay={500} />
                    {isFetchDogStatusError ? <p>There was a problem</p> : null}
                    {isFetchDogStatusSuccess ? (
                        <img className="h-64 w-full object-cover" src={dog} alt="Dog" />
                    ) : null}
                </div>
            </div>
            <button
                onClick={initFetchDog}
                className="mt-4 bg-blue-800 text-blue-100 p-4"
            >
                Fetch dogs
            </button>
        </div>
    )
}