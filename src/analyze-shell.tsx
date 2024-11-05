import { ActionPanel, List, Detail, showToast, Toast } from "@raycast/api";
import { execSync } from "child_process";
import { homedir } from "os";
import { join } from "path";

interface ShellMetrics {
    real: number;
    user: number;
    sys: number;
}

export default function Command() {
    const [metrics, setMetrics] = useState<ShellMetrics[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        measurePerformance();
    }, []);

    async function measurePerformance() {
        try {
            const times: ShellMetrics[] = [];
            for (let i = 0; i < 10; i++) {
                const result = execSync('/usr/bin/time zsh -i -c exit 2>&1').toString();
                times.push(parseTimeOutput(result));
            }
            setMetrics(times);
        } catch (error) {
            await showToast({
                style: Toast.Style.Failure,
                title: "Failed to measure performance",
                message: String(error)
            });
        } finally {
            setIsLoading(false);
        }
    }

    const averages = {
        real: average(metrics.map(m => m.real)),
        user: average(metrics.map(m => m.user)),
        sys: average(metrics.map(m => m.sys))
    };

    return (
        <List isLoading={isLoading}>
            <List.Section title="Shell Performance">
                <List.Item
                    title="Average Startup Time"
                    subtitle={`${averages.real.toFixed(2)}s`}
                    accessories={[
                        {
                            icon: averages.real < 0.2 ? "✅" : "⚠️",
                            tooltip: averages.real < 0.2 ? "Good" : "Needs Optimization"
                        }
                    ]}
                    actions={
                        <ActionPanel>
                            <ActionPanel.Item
                                title="Optimize Shell"
                                onAction={() => push(<OptimizeView currentMetrics={averages} />)}
                            />
                        </ActionPanel>
                    }
                />
            </List.Section>
        </List>
    );
}