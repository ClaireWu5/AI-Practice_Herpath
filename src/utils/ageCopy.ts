export function getCurrentAge(birthYear: number): number {
  return new Date().getFullYear() - birthYear
}

export function getAgeRelationSentence(birthYear: number): string {
  const age = getCurrentAge(birthYear)
  const nodeAges = [17, 22, 25, 28, 32]
  const pastNodes = nodeAges.filter((a) => age > a)
  const futureNodes = nodeAges.filter((a) => age < a)
  const currentNode = nodeAges.find((a) => a === age)

  if (currentNode) {
    return `你今年${age}岁，正站在${currentNode}岁这个节点上。`
  }
  if (pastNodes.length === nodeAges.length) {
    return `你今年${age}岁，也许你已经走过了这些岁月。`
  }
  if (futureNodes.length === nodeAges.length) {
    return `你今年${age}岁，前面的路还长着呢。`
  }
  const nextNode = futureNodes[0]
  const yearsUntil = nextNode - age
  return `你今年${age}岁，${nextNode}岁对你来说还有${yearsUntil}年。`
}
