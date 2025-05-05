import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello SKYST!';
  }

  getDummyUsers(): { email: string; name: string }[] {
    return [
      {
        name: '박준열',
        email: '2019147551@yonsei.ac.kr',
      },
      {
        name: '윤영준',
        email: 'yyj0917@yonsei.ac.kr',
      },
      {
        name: '이지호',
        email: 'tigerzi@yonsei.ac.kr',
      },
      {
        name: '여민서',
        email: 'yeominseo59618@gmail.com',
      },
      {
        name: '장서린',
        email: 'jangseorin@yonsei.ac.kr',
      },
    ];
  }
}
