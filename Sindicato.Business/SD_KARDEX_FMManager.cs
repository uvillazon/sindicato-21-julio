using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Common.Data;
using Sindicato.Model;
using Sindicato.Common.Data.Interfaces;
using System.Data.Objects;

namespace Sindicato.Business
{
    public class SD_KARDEX_FMManager : Repository<SD_KARDEX_FM>
    {
        public SD_KARDEX_FMManager(IUnitOfWork uow) : base(uow) { }

        //test
        
    }
}
