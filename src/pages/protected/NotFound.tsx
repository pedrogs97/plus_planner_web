import FaceFrownIcon  from '@heroicons/react/24/solid/FaceFrownIcon'

export function NotFound(){


    return(
        <div className="hero h-full bg-base-200">
            <div className="hero-content text-accent text-center">
                <div className="max-w-md">
                <FaceFrownIcon className="h-48 w-48 inline-block"/>
                <h1 className="text-5xl font-bold">Página não encontrada</h1>
                </div>
            </div>
        </div>
    )
}