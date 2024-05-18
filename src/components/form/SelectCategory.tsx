"use client"

import { useState } from "react"
import { Card, CardHeader } from "../ui/card"
import { categoryList } from "@/lib/categoryList"

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("")
  return (
    <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <input type="hidden" name="category" value={selectedCategory || ""} />
      {categoryList.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={
              selectedCategory === item.name
                ? "border-primary border-2"
                : "border-2 border-primary/10 shadow-xl"
            }
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              {item.image}
              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  )
}
export default SelectCategory
