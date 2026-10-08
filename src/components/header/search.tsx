import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search as SearchIcon } from 'lucide-react'

export function Search() {
  return (
    <div className="flex-1 min-w-0 max-w-md">
      <form role="search" className="mx-auto w-full max-w-md">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <Input
            type="search"
            id="search"
            placeholder="Search"
            className="h-10 pl-5 rounded-2xl"
            required
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 inset-y-1 my-auto h-8 rounded-2xl ">
            <SearchIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </div>
  )
}
