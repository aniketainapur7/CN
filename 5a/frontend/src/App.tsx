import { useState } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  mse: string;
  ese: string;
}

function App() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: '', mse: '', ese: '' }
  ]);

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { id: Date.now().toString(), name: '', mse: '', ese: '' }
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const updateSubject = (id: string, field: keyof Subject, value: string) => {
    setSubjects(subjects.map(subject =>
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const calculateTotal = (mse: string, ese: string): number => {
    const mseMarks = parseFloat(mse) || 0;
    const eseMarks = parseFloat(ese) || 0;
    return (mseMarks * 0.3) + (eseMarks * 0.7);
  };

  const calculateOverallStats = () => {
    const validSubjects = subjects.filter(s => s.name && s.mse && s.ese);
    if (validSubjects.length === 0) return null;

    const totalMarks = validSubjects.reduce((sum, subject) =>
      sum + calculateTotal(subject.mse, subject.ese), 0
    );
    const average = totalMarks / validSubjects.length;

    return { totalMarks, average, count: validSubjects.length };
  };

  const stats = calculateOverallStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Marks Entry System
          </h1>
          <p className="text-slate-600">
            Enter MSE (30%) and ESE (70%) marks for each subject
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 w-8"></th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Subject Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 w-32">
                    MSE (30%)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 w-32">
                    ESE (70%)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 w-32">
                    Total
                  </th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subjects.map((subject, index) => {
                  const total = calculateTotal(subject.mse, subject.ese);
                  const hasData = subject.mse && subject.ese;

                  return (
                    <tr key={subject.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={subject.name}
                          onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                          placeholder="Enter subject name"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={subject.mse}
                          onChange={(e) => updateSubject(subject.id, 'mse', e.target.value)}
                          placeholder="0-100"
                          min="0"
                          max="100"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={subject.ese}
                          onChange={(e) => updateSubject(subject.id, 'ese', e.target.value)}
                          placeholder="0-100"
                          min="0"
                          max="100"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className={`px-3 py-2 rounded-lg font-semibold text-center ${
                          hasData
                            ? total >= 50
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {hasData ? total.toFixed(2) : '-'}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeSubject(subject.id)}
                          disabled={subjects.length === 1}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400"
                          title="Remove subject"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
            <button
              onClick={addSubject}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Subject
            </button>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calculator className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-slate-600">Total Subjects</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.count}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calculator className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-sm font-medium text-slate-600">Average Marks</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.average.toFixed(2)}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calculator className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-sm font-medium text-slate-600">Total Marks</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.totalMarks.toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Calculation Formula</h4>
          <p className="text-sm text-blue-700">
            Total Marks = (MSE × 0.30) + (ESE × 0.70)
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
