export function AppFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 px-6">
      <div className="flex flex-col items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Mikav AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
