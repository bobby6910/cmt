import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountryList } from "./countrylist";

import { Country, City, ICountry } from "country-state-city";
import { useCon } from "@/Context/DataProvider";
import { useEffect, useState } from "react";
import { StateList } from "./statelist";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function DialogDemo() {
  const [country, setCountry] = useState<Array<ICountry>>([]);
  const { city, conference, changedata } = useCon();
  const insertconf = useMutation(api.conference.createConference);

  useEffect(() => {
    setCountry(Country.getAllCountries());
  }, [country]);

  useEffect(() => {
    console.log(conference);
  }, [conference]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Conference</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Conference</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(event) => {
                const data = {
                  name: event.target.value,
                  blog: "sdsdsdsdsds",
                  country: conference["country"],
                  state: conference["state"],
                };
                changedata(data);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Country
            </Label>
            <CountryList data={country} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              State
            </Label>
            <StateList data={city} />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={async (event) => {
              event.preventDefault();

              if (
                !conference["blog"] ||
                !conference["country"] ||
                !conference["name"] ||
                !conference["state"]
              )
                return;

              const data = await insertconf({
                blogsite: conference["blog"],
                state: conference["state"],
                country: conference["country"],
                name: conference["name"],
              });
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
