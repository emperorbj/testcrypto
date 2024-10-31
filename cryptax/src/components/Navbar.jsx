import { Button } from "./ui/button"
import Toggle from "./toggle"


const Navbar = () => {
    return (
        <div className="shadow-md px-4 md:px-8 rounded-md p-4 flex items-center justify-between">
            <div>
                <img src="/logo.svg" alt="logo" />
            </div>
            <div className="flex items-center gap-3">
                <Button className='px-6 py-3 dark:bg-sky-400'>Sign up</Button>
                <Toggle/>
            </div>
        </div>
    )
}

export default Navbar
