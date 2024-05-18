import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  try {
    if (!user || user == null || !user?.id) {
      throw new Error("User not found.")
    }

    let userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    })

    if (!userData) {
      userData = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email ?? "",
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          profileImage: user.picture ?? "",
        },
      })
    }

    return NextResponse.redirect(
      process.env.NODE_ENV === "production"
        ? "/dashboard"
        : "http://localhost:3000"
    )
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error fetching user data.",
    })
  }
}
