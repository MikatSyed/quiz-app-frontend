export const getBaseUrl = ():string => {
    
    return process.env.NEXT_PUBLIC_API_BASE_URL || "https://quiz-app-backend-navy.vercel.app/api/v1"
}