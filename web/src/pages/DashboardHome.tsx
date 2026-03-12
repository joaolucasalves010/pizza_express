import React from "react";

type Props = {};

const DashboardHome = (props: Props) => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        Visão Geral
      </h1>
      <p className="text-gray-500 mt-1 text-sm md:text-base">
        Bem-vindo ao painel de administração.
      </p>
    </div>
  );
};

export default DashboardHome;
