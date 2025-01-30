'use client'

export default function GenerateSingleCodeBtn({ token , setQRLink}) {
  function generateString(token) {
    try {
      const link = `http://localhost:3000/api/qr/validate?token=${token}`;
      console.log("Your code is: " + link);
      return link; // This is fine as long as it's not directly affecting the `onClick` binding.
    } catch (error) {
      console.error("Chosen token isn't correct");
      return null; // Return null or handle the error gracefully.
    }
  }

  function handleClick() {
    const link = generateString(token);
    if (link) {
      //setQRLink(link);
      alert(`Generated link: ${link}`); // Example action upon successful generation
      console.log("link: "+ link)
    }
  }

  return (
    <button
      onClick={handleClick} // Use a clear function for `onClick`
      className="underline text-blue-300 hover:text-blue-100"
    >
      Generate Code
    </button>
  );
}
