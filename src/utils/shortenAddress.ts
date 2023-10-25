export default function shortenAddress(address: string) {
  if (address?.length < 13) return address

  return `${address?.substring(0, 5)}...${address?.substring(address?.length - 4, address?.length)}`
}
