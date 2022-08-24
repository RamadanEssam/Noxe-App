import React from 'react'

export default function Home({userData}) {
  return (
    <div>welocme {userData?.first_name}</div>
  )
}
