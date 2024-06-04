"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getNames } from "country-list";
import { Country, City, ICountry, ICity, IState } from "country-state-city";
import { ScrollArea } from "./scroll-area";
import { useCon } from "@/Context/DataProvider";
import { NextPage } from "next";

type Props = {
  data: Array<IState> | null;
};

export const StateList: NextPage<Props> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { city, changeCity, changedata, conference } = useCon();

  React.useEffect(() => {
    console.log(city);
  }, [city, changeCity]);

  React.useEffect(() => {
    const data = {
      name: conference["name"],
      blog: conference["blog"],
      country: conference["country"],
      state: value,
    };
    changedata(data);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={data ? false : true}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[275px] justify-between"
        >
          {data && value
            ? data.find((c) => c.name === value)?.name
            : "Select State"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[275px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <ScrollArea className="h-72 w-100 rounded-md border z-50">
              <CommandGroup>
                {data &&
                  data.map((c, i) => (
                    <CommandItem
                      key={i}
                      value={c.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === c.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {c.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
