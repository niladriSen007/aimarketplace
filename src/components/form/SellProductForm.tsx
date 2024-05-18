"use client"
import { useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import SelectCategory from "./SelectCategory"
import { JSONContent } from "@tiptap/react"
import { TipTapEditor } from "../Editor"
import { toast } from "sonner"
import { UploadDropzone } from "@/lib/uploadthing"
import { Button } from "../ui/button"

const SellProductForm = () => {
  const [json, setJson] = useState<null | JSONContent>(null)
  const [images, setImages] = useState<null | string[]>(null)
  const [productFile, SetProductFile] = useState<null | string>(null)
  return (
    <form>
      <CardHeader>
        <CardTitle className="text-2xl">Sell your product with ease</CardTitle>
        <CardDescription className="text-lg">
          Please describe your product here in detail so that it can be sold
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label className="text-lg">Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Name of your Product"
            required
            minLength={3}
          />
          {/*   {state?.errors?.["name"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
          )} */}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-lg">Category</Label>
          <SelectCategory />
          {/* {state?.errors?.["category"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["category"]?.[0]}
            </p>
          )} */}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-lg">Price</Label>
          <Input
            placeholder="29$"
            type="number"
            name="price"
            required
            min={1}
          />
          {/*  {state?.errors?.["price"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>
          )} */}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-lg">Small Summary</Label>
          <Textarea
            name="smallDescription"
            placeholder="Pleae describe your product shortly right here..."
            required
            minLength={10}
          />
          {/*  {state?.errors?.["smallDescription"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["smallDescription"]?.[0]}
            </p>
          )} */}
        </div>
        <div className="flex flex-col gap-y-2">
          <input
            type="hidden"
            name="description"
            value={JSON.stringify(json)}
          />
          <Label className="text-lg">Description</Label>
          <TipTapEditor json={json} setJson={setJson} />
          {/*   {state?.errors?.["description"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["description"]?.[0]}
            </p>
          )} */}
        </div>
        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <Label className="text-lg">Product Images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res.map((item) => item.url))
              toast.success("Your images have been uploaded")
            }}
            onUploadError={(error: Error) => {
              toast.error("Something went wrong, try again")
            }}
          />
          {/*  {state?.errors?.["images"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
          )} */}
        </div>
        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="productFile" value={productFile ?? ""} />
          <Label className="text-lg">Product File</Label>
          <UploadDropzone
            endpoint="productFileUploader"
            onClientUploadComplete={(res) => {
              SetProductFile(res[0].url)
              toast.success("Your Product file has been uplaoded!")
            }}
            onUploadError={(error: Error) => {
              toast.error("Something went wrong, try again")
            }}
          />
          {/*  {state?.errors?.["productFile"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["productFile"]?.[0]}
            </p>
          )} */}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="rounded-sm">
          Sell Product
        </Button>
      </CardFooter>
    </form>
  )
}
export default SellProductForm
