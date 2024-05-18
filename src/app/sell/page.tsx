import SellProductForm from "@/components/form/SellProductForm"
import { Card } from "@/components/ui/card"

const page = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <SellProductForm />
      </Card>
    </section>
  )
}
export default page
