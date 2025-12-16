import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const LocationDropDown = ({ location, setLocation }) => {
    return (
        <Select value={location} onValueChange={(value) => setLocation(value)} >
            <SelectTrigger className="w-full md:w-55">
                <SelectValue placeholder="Choose city" />
            </SelectTrigger>
            <SelectContent className="z-1001">
                <SelectGroup>
                    {
                        location === 'custom' ?
                            <SelectItem value="custom" selected={true}>Cutom</SelectItem>
                            : null
                    }
                    {
                        cities.map((city, index) =>
                            <SelectItem key={index} value={city}>{city}</SelectItem>
                        )
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

const cities = [
    "Bangkok",
    "Tokyo",
    "Seoul",
    "Dubai",
    "Manila",
    "London",
    "New York",
    "Paris",
    "Berlin",
    "Madrid",
    "Rome",
    "Lisbon",
]

export default LocationDropDown