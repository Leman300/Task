const Footer = () => {
  const footerYear = new Date().getFullYear()

  return (
    <div className="flex justify-center items-center py-12 bg-violet-300 text-violet-900">
      <p className="text-center mx-4">
        Copyright &copy; {footerYear} | Realization:{" "}
        <a
          className="font-semibold hover:text-violet-600 transition text-shadow-hover"
          href="https://leman300.github.io/portfolio/"
          target="__blank"
          rel="noreferrer"
        >
          Bartosz Lemanek
        </a>
      </p>
    </div>
  )
}

export default Footer
