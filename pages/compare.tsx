import { useRouter } from "next/router";
import { useGetCompareLaunchesQuery } from "../src/generated/graphql";
import graphqlRequestClient from "../src/lib/client/graphqlRequestClient";
// const comparisonData = {
//   data: {
//     launch1: {
//       id: "100",
//       launch_success: true,
//       static_fire_date_unix: null,
//       tentative_max_precision: "hour",
//       rocket: {
//         rocket_name: "Falcon 9",
//         rocket_type: "FT",
//         first_stage: {
//           cores: [
//             {
//               land_success: true,
//             },
//           ],
//         },
//         second_stage: {
//           payloads: [
//             {
//               payload_type: "Satellite",
//               payload_mass_kg: 15400,
//             },
//           ],
//         },
//       },
//       mission_name: "Starlink-10 (v1.0) & SkySat 19-21",
//     },
//     launch2: {
//       id: "109",
//       launch_success: true,
//       static_fire_date_unix: 1605976260,
//       tentative_max_precision: "hour",
//       rocket: {
//         rocket_name: "Falcon 9",
//         rocket_type: "FT",
//         first_stage: {
//           cores: [
//             {
//               land_success: true,
//             },
//           ],
//         },
//         second_stage: {
//           payloads: [
//             {
//               payload_type: "Satellite",
//               payload_mass_kg: 15400,
//             },
//           ],
//         },
//       },
//       mission_name: "Starlink-15 (v1.0)",
//     },
//   },
// };
const ComparePage = () => {
  const { query } = useRouter();
  const { data: comparisonData, isLoading } = useGetCompareLaunchesQuery(graphqlRequestClient, {
    id1: query.launchId1 as string,
    id2: query.launchId2 as string,
  });

  //! If I had more tim, I would design this page better

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoading && !comparisonData) {
    return <div>oops! Something went wrong</div>;
  }

  return (
    <div className="flex flex-col p-8 text-gray-200 ">
      <div className="grid w-full grid-cols-8 p-4">
        <div className="col-span-2 "></div>
        <div className="col-span-3 text-xl ">
          <span>{comparisonData.launch1?.mission_name}</span>
        </div>
        <div className="col-span-3 text-xl ">
          <span>{comparisonData.launch2?.mission_name}</span>
        </div>
      </div>
      <TableCell
        title="launch_success"
        value1={comparisonData.launch1?.launch_success?.toString()}
        value2={comparisonData.launch2?.launch_success?.toString()}
      />
      <TableCell
        title="static_fire_date_unix"
        // @ts-ignore
        value1={comparisonData.launch1?.static_fire_date_unix?.toString()}
        value2={comparisonData.launch2?.static_fire_date_unix?.toString()}
      />

      <TableCell
        title="rocket_name"
        value1={comparisonData.launch1?.rocket?.rocket_name}
        value2={comparisonData.launch2?.rocket?.rocket_name}
      />

      <TableCell
        title="rocket_type"
        value1={comparisonData.launch1?.rocket?.rocket_type}
        value2={comparisonData.launch2?.rocket?.rocket_type}
      />
      <TableCell
        title="land_success"
        value1={comparisonData.launch1?.rocket.first_stage.cores[0].land_success?.toString()}
        value2={comparisonData.launch2?.rocket.first_stage.cores[0].land_success?.toString()}
      />

      <TableCell
        title="payload_type"
        value1={comparisonData?.launch1?.rocket?.second_stage?.payloads[0].payload_type!}
        value2={comparisonData?.launch2?.rocket?.second_stage.payloads[0]?.payload_type}
      />
    </div>
  );
};

export default ComparePage;
const TableCell = ({
  title,
  value1,
  value2,
}: {
  title: string;
  value1: string | undefined | null;
  value2: string | undefined | null;
}) => (
  <div className="grid grid-cols-8 p-2 bg-gray-800 border border-gray-700">
    <div className="col-span-2 p-2 text-lg text-gray-200">{snakeToSpaceCase(title)}</div>
    <div className="col-span-3 p-2 text-gray-100 ">
      <span>{value1 || "N/A"}</span>
    </div>
    <div className="col-span-3 p-2 text-gray-100">
      <span>{value2 || "N/A"}</span>
    </div>
  </div>
);

function snakeToSpaceCase(snakeString: string) {
  var words = snakeString.split("_");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
}

/*

{
  launch1: launch(id: 100) {

    id
    launch_success
    static_fire_date_unix
    tentative_max_precision
    rocket {
      rocket_name
      rocket_type,
      first_stage{
        cores{
          land_success
        }
        
        
      }
      second_stage{
        payloads{
          payload_type,
          payload_mass_kg
        }
      }
      
    }
    mission_name,
    
  }
  launch2: launch(id: 109) {

    id
    launch_success
    static_fire_date_unix
    tentative_max_precision
    rocket {
      rocket_name
      rocket_type,
      first_stage{
        cores{
          land_success
        }
        
        
      }
      second_stage{
        payloads{
          payload_type,
          payload_mass_kg
        }
      }
      
    }
    mission_name,
}

*/
