export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>This is the User Profile Page</h1> <br />
      <h1>
        Welcome, <span className="bg-orange-500 rounded font-bold text-black p-2 ">{params.id}</span>{" "}
      </h1>
    </div>
  );
}
