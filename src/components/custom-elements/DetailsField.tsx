export const Field = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-start gap-3">
    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
    <div>
      <p className="text-sm font-medium font-semibold text-gray-700">{label}</p>
      <p className="mt-1 text-sm text-gray-600">{value}</p>
    </div>
  </div>
);
