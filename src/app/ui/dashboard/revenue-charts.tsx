import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default function RevenueChart({ revenue }: { revenue: Revenue[] }) {
    const chartHeight = 350;

    const { yAxisLabels, topLabel } = generateYAxis(revenue);

    if (!revenue || revenue.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }

    return (
        <div className="w-full md:col-span-4 flex flex-col items-center">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Recent Revenue
            </h2>

            <div className="rounded-xl bg-gray-50 p-4">
                <div className="sm:grid-cols-13 mt-0 gap-2 rounded-md p-4 md:gap-4 flex items-end justify-center">
                    {/* Y-Axis Labels */}
                    <div
                        className="mb-6 w-[20px] hidden flex-col justify-between text-gray-800 sm:flex text-xs"
                        style={{ height: `${chartHeight}px` }}
                    >
                        {yAxisLabels.map((label) => (
                            <p key={label}>{label}</p>
                        ))}
                    </div>

                    {/* Revenue Bars */}
                    {revenue.map((month) => (
                        <div key={month.month} className="flex flex-col items-center gap-2">
                            <div
                                className="w-[25px] rounded-md bg-[#ff7a21]"
                                style={{
                                    height: `${(chartHeight / topLabel) * month.revenue}px`,
                                }}
                            ></div>
                            <p className="-rotate-90 text-xs text-gray-800 sm:rotate-0">
                                {month.month}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-center pb-2 pt-6">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
                </div>
            </div>
        </div>
    );
}
