export default function Header({title, subtitle} : {title: string, subtitle?: string}){
  return(
    <div>
      <h1 className="text-4xl font-bold">{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}