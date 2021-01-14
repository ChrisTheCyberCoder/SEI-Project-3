


export function itemRating(n){
  const rating = []
  for (let a = 0; a < n; a++) rating.push('star') 
  for (let b = 0; b < (5 - n); b++) rating.push('blank') 
  return rating
}