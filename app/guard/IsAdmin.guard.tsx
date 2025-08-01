// "use client"

// import { useEffect, useState } from "react"
// import { getCookie } from "cookies-next"
// import { useRouter } from "next/navigation"
// import { useGetCurrentUserOrCompany } from "../lib/getCurrentUserOrCompany"
// import { Company, User } from "../types/types"
// import LoadingOverlay from "../components/__atoms/loader"

// export default function IsAdminGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(true)
//   const [user, setUser] = useState<Company | User | null>(null)
//   const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany()
//   const token = getCookie("token")

//   const gela = async () => {

//     if (token) {
//       const resp = await getCurrentUserOrCompany({ token, })
//       console.log(resp)
//       setUser(resp)
//       if (resp.role !== 'ADMIN') {
//         console.log("shemovida")
//         router.push("/")
//       }
//     }
//     setIsLoading(false)
//   }

//   useEffect(() => {
//     gela()
//   }, [])

//   if (!isLoading && user?.role !== "ADMIN") {
//     return null
//   }

//   if (isLoading) return <LoadingOverlay />

//   return <>{children}</>
// }
