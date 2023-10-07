import React from "react";

const Table = ({ datas }) => {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="table-auto  ">
        <thead className="bg-gray-200 rounded-xl">
          <tr>
            <th className="border  px-4 py-2  text-black">ID</th>
            <th className="border  px-4 py-2  text-black">Full Name</th>
            <th className="border  px-4 py-2  text-black">Email</th>
            <th className="border  px-4 py-2  text-black">Phone</th>
            <th className="border  px-4 py-2  text-black">Subject</th>
            <th className="border  px-4 py-2  text-black">
              Test Taking Date
            </th>
            <th className="border  px-4 py-2  text-black">Full Marks</th>
            <th className="border  px-4 py-2  text-black">Mark Obtained</th>
            <th className="border  px-4 py-2  text-black">
              Overall Percentage
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {datas && datas.map((data) => (
            <tr key={data.id}>
              <td className="border  px-4 py-2 text-black">{data.id}</td>
              <td className="border  px-4 py-2 text-black">
                {data.full_name}
              </td>
              <td className="border  px-4 py-2 text-black">{data.email}</td>
              <td className="border  px-4 py-2 text-black">{data.phone}</td>
              <td className="border  px-4 py-2 text-black">
                {data.subject}
              </td>
              <td className="border  px-4 py-2 text-black">
                {data.test_taking_date}
              </td>
              <td className="border  px-4 py-2 text-black">
                {data.full_marks}
              </td>
              <td className="border  px-4 py-2 text-black">
                {data.mark_obtained}
              </td>
              <td className="border  px-4 py-2 text-black">
                {data.overall_percentage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
