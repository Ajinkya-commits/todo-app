
const Checkbox = ({ onChange, checked }: { onChange: () => void; checked?: boolean }) => {
  return (
    <>
    <div className="flex items-center pl-2">
    <input type="checkbox" value="" onClick={(e)=>{ e.stopPropagation()}} onChange={onChange}
    checked={checked} className="w-4 h-4 text-black bg-gray-400 border-gray-300 rounded" />
</div>
    </>
  )
}

export default Checkbox