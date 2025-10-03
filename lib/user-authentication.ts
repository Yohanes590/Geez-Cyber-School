import Cookies from "js-cookie"

export async function checkingUserRole() {
  const LoadingScreen = document.querySelector(".loading-screen") as HTMLElement
  const userTokenCookie = Cookies.get("token")
  if(!userTokenCookie) return window.location.href="/"
  const userToken = await fetch("/api/auth/userCheck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: userTokenCookie,
    }),
  })

  const changeResponse = await userToken.json()
  const linkPath = window.location.pathname.split("/")[2]

  if (changeResponse[0].user_role !== linkPath) {
    window.location.href = "/dashboard/" + changeResponse[0].user_role
  } else {
    if (LoadingScreen) LoadingScreen.style.display = "none"
    console.log("Authorization success")
  }

return changeResponse
}
