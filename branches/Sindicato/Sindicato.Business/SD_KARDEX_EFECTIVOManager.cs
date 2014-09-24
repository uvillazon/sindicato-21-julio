
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
    public class SD_KARDEX_EFECTIVOManager : Repository<SD_KARDEX_EFECTIVO>
    {


        public SD_KARDEX_EFECTIVOManager(IUnitOfWork uow) : base(uow) { }

        //test
        
    }
}
