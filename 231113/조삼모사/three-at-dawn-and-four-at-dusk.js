/** 
     * [문제 이해]
     * 
     * 4 <= n <= 20
     * 
     * i 는 열 길이, j는 행 길이
     * 1 <= i = j <= 100
     * 
     * 오전 오후 라는 두개의 케이스로 나눠서 일을 하면 됨
     * 일의 갯수 n이 4일때
     * 오전에 일 2개 오후에 일 2개를 해야하고
     * 12 번 일을 오전에 하면 1&2의 상성 일 + 2&2의 상성일을 더한게 오전일의 합
     * 남아있는 일인 34 번 일을 오후에 하면 3&4의 상성 일 + 4&3의 상성일을 더한게 오후일의 합이 됨
     * 오전 합과 오후 합의 차이가 가장 작은 케이스를 정답으로 반환하면 된다.
     * 
     * n이 4일 떄 모든 케이스
     * 오전 12, 오후 34
     * 오전 13, 오후 24
     * 오전 14, 오후 23
     * 
     * 
     * [sudo 풀이]
     * n이 6 일 때 모든 케이스
     * 123, 456
     * 
     * 1개 변경
     * 
     * 124, 356
     * 125, 436
     * 126, 453
     * 
     * 143, 256
     * 153, 326
     * 163, 452
     * 
     * 423, 156
     * 523, 416
     * 623, 451
     * 
     * 2개 변경
     * 
     * 145, 236
     * 156, 423
     * 
     * 453, 126
     * 563, 423
     * 
     * [풀이]
     * 
     * 일단 인덱스로 배열에 접근하는 개념이 너무 익숙해서 이걸 어떻게 n에 맞게 다르게 할 지 모르겠음
     * 처음 n이 주어지면 0부터 n - 1 까지 배열에 담기
     * 반으로 갈라서 두 개 배열로 분리
     * 처음은 그냥 높은 값으로 변수 answer를 초기화
     * 
     * 반으로 가른 배열의 길이 - 1까지 하나씩 변경할 배열 인수 갯수를 늘리면서 dfs 순회
     *  종료 조건
     *      기존 구한 최소값(answer)보다 크면 종료
     *  주어진 배열에서 조합해서 일 값을 구하는 반복문
     *  중복 없이 배열 내 ij로 순회
     *  값 더하다가 기존 구한 최소값(answer)보다 커지면 그냥 dfs종료
     * 
     * 강도 구하기
     *      배열 2차원 순회하면서 ij로 인덱스 순회하면서 더하기
     * 결과 리턴
     * 
     * 최소값 구하기 dfs 자체를 index와 depth로 구하기?
     *  종료 조건 depth == n / 2
     *      아침 배열에 없는 인덱스 값을 저녁 배열에 넣기
     *      아침 저녁 일 강도 차이를 answer에 넣기(기존 answer 값보다 작으면 넣고 아니면 안넣고)
     *  
     * 
     *  순회하면서 dfs 호출 index 시작에서 n / 2까지
     *      아침 배열에 i 추가
     *      dfs(i, depth + 1)
     *      아침 배열에서 제일 앞에값 뺴기 shift()
     * 
     * */ 
function solution(n, compatibilities) {
    const workSum = (indexes) => {
        let sum = 0;
        for (let i = 0; i < n / 2; ++i) {
            for (let j = i + 1; j < n / 2; ++j) {
                sum += compatibilities[indexes[i]][indexes[j]];
                sum += compatibilities[indexes[j]][indexes[i]];
            }
        }
        return sum;
    }

    let answer = Number.MAX_VALUE;
    const morning = [0];

    const dfs = (index, depth) => {
        if (depth === n / 2) {
            const night = [];
            for (let i = 0; i < n; ++i) {
                if (!morning.includes(i)) {
                    night.push(i)
                }
            }
            answer = Math.min(answer, Math.abs(workSum(morning) - workSum(night)));
        }

        for (let i = index + 1; i < n; ++i) {
            morning.push(i);
            dfs(i, depth + 1);
            morning.pop();
        }
    }

    dfs(0, 1);
    return answer;
}


const file = process.platform === "linux" ? "/dev/stdin" : __dirname + '/input.txt';
const [n, ...rest] = require('fs').readFileSync(file).toString().trim().split('\n');

const arr = rest.map(x => x.split(' ').map(Number));

console.log(solution(n, arr));