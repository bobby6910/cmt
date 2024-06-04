import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]


type CardProps = React.ComponentProps<typeof Card> & {
    data: any | null
}


export function CardDemo({ className, data, ...props }: CardProps) {
    console.log(data)
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{`${data.country}, ${data.state}`}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          
        </div>
      </CardContent>
      <CardFooter>
            <Link href={`/conference/${data._id}`} className="w-full">
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Edit Submissions
        </Button>
            </Link>
      </CardFooter>
    </Card>
  )
}
