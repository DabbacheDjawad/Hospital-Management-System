import Button from "../Components/Button";
const Register = () => {
  return (
    <div
      className="border-1 border-[rgba(0,0,0,0.2)] shadow-2xl lg:w-[60%] xl:w-[50%] md:w-[80%] m-auto 
    w-90% mt-24"
    >
      <form action="" className="flex flex-col gap-10 p-10 mt-12 mb-12">
        {/* email */}
        <div className="flex gap-2 items-center">
          <label className="mr-[6%] text-2xl text-[rgba(1,0,0,0.91)]">
            Email
          </label>
          <input
            type="email"
            placeholder="Provide your Email Please"
            className="outline-1 outline-gray-500 rounded-md text-xl p-3 w-[80%]"
          />
        </div>

        {/* password */}
        <div>
          <label className="mr-2 text-2xl text-[rgba(1,0,0,0.91)]">
            Password
          </label>
          <input
            type="password"
            placeholder="Provide your Password Please"
            className="outline-1 outline-gray-500 rounded-md text-xl p-3 w-[80%]"
          />
        </div>

        <div>
          <Button className={"!w-[80%] m-auto"}>Register</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
