import type {Config} from 'jest';

const config: Config = {
    verbose: true,
    collectCoverage: true,
    testEnvironment: "node",
    preset: "ts-jest",
    transform: {
        "^.+\\.ts?$": "ts-jest"
    }
};

export default config;