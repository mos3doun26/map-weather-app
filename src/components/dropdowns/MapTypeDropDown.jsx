import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const MapTypeDropDown = ({ mapType, setMapType }) => {
    return (
        <Select value={mapType} onValueChange={(value) => setMapType(value)}>
            <SelectTrigger className="w-full md:w-55">
                <SelectValue placeholder="Map Type" />
            </SelectTrigger>
            <SelectContent className="z-1001">
                <SelectGroup>
                    {
                        mapTypes.map((type, index) =>
                            <SelectItem key={index} value={type.value}>{type.label}</SelectItem>
                        )
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

const mapTypes = [
    {
        label: "Clouds",
        value: "clouds_new"
    },
    {
        label: "Precipitation",
        value: "precipitation_new"
    },
    {
        label: "Wind Speed",
        value: "wind_new"
    },
    {
        label: "Temperature",
        value: "temp_new"
    },
    {
        label: "Pressure",
        value: "pressure_new"
    },
];


export default MapTypeDropDown