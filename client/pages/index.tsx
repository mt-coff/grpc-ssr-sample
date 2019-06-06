import ky from "ky-universal";

const onHello = async () => {
  try {
    const res = await ky.get("http://localhost:3000/api/hello", {
      mode: "cors"
    });

    console.log(await res.json());
  } catch (err) {
    console.error(err);
  }
};

export default () => (
  <div>
    <h1>grpc & ssr test</h1>
    <button onClick={onHello}>call hello</button>
  </div>
);
