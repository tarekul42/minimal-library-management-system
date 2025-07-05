import { useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import type { IInput } from "@/types/form";

export default function MLMSTextArea({name, label, defaultValue} : IInput){
    const {register} = useFormContext();

    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Textarea {...register(name)} defaultValue={defaultValue} />
            </FormControl>
        </FormItem>
    )
}